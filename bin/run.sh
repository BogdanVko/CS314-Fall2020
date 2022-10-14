#!/bin/bash

umask 077;

if [[ -z "$S_PORT" ]]; then 
  export S_PORT=8000; 
fi
if [[ -z "$C_PORT" ]]; then 
  export C_PORT=3000;
fi

if [[ -z "$REVISION" ]]; then
  REVISION=local
fi

check_error() {
  if [ "$1" -ne 0 ]; then
    echo "Failed at step: ${FUNCNAME[1]}"
    exit "$1"
  fi
}

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}";
}

function usage {
  echo "usage: $0 [OPTIONS]";
  echo "Options:"
  echo "    -h, --help     :  Display this menu";
  echo "    -e, --env      :  Specify environment, possible choices: [dev,prod], (default, dev)";
  echo ""
}

function get_repo_root_dir {
  dir="$(realpath $1)";
  while [[ ! -d "$dir/.git" ]];
  do
    dir=`echo $dir | sed 's~\(.*\)/.*~\1~'`;
  done;

  export REPO_ROOT=$dir;

}

function get_default_prefix {
  if [[ -n "$NFS_MOUNTED" ]]; then
    export BUILD_DIRECTORY_PREFIX="/tmp/cs314-$(whoami)"
  else
    export BUILD_DIRECTORY_PREFIX="${REPO_ROOT}"
  fi
}

get_repo_root_dir $0;
NFS_MOUNTED=`if [[ "$(stat -f -L -c %T ${REPO_ROOT})" == "nfs" ]]; then echo 1; fi;`
get_default_prefix;

function install_client_dependencies {
  if [[ -n "${NFS_MOUNTED}" ]]; then
    pushd ${REPO_ROOT}/client > /dev/null
    if [[ ! -L node_modules && -d node_modules ]]; then
      echo "Cleaning NFS mounted client/node_modules"
      rm -rf node_modules
    fi
    function _install_client_dependences {
      if [[ ! -e node_modules ]]; then
        mkdir -p ${BUILD_DIRECTORY_PREFIX}/client
        cp package.json ${BUILD_DIRECTORY_PREFIX}/client/
        npm install --prefix ${BUILD_DIRECTORY_PREFIX}/client
        ln -sf ${BUILD_DIRECTORY_PREFIX}/client/node_modules node_modules
      fi
    }
    _install_client_dependences
    check_error $?
    popd > /dev/null
  else
    if [[ ! -d "${REPO_ROOT}/client/node_modules" ]]; then
      npm install --prefix ${REPO_ROOT}/client
      check_error $?
    fi
  fi
}

function install_server_dependencies {
  if [[ -n "${NFS_MOUNTED}" ]]; then
    pushd ${REPO_ROOT}/server > /dev/null
    if [[ ! -L .m2/repository && -d .m2/repository ]]; then
      echo "Cleaning NFS mounted server/.m2/repository"
      rm -rf .m2/repository
    fi
    function _install_server_dependences {
      if [[ ! -e .m2/repository ]]; then
        mkdir -p ${BUILD_DIRECTORY_PREFIX}/server/.m2/repository
        mvn --global-settings .m2/settings.xml \
          -Dmaven.repo.local=${BUILD_DIRECTORY_PREFIX}/server/.m2/repository \
          -Drevision=${REVISION} \
          -Dbuild.directory.prefix=${BUILD_DIRECTORY_PREFIX} \
          install 2>&1 | grep '^Download'
        ln -sf ${BUILD_DIRECTORY_PREFIX}/server/.m2/repository .m2/repository
      fi
    }
    _install_server_dependences
    check_error $?
    popd > /dev/null
  else
    if [[ ! -d "${REPO_ROOT}/server/.m2/repository" ]]; then
      mvn -f ${REPO_ROOT}/server \
        --global-settings ${REPO_ROOT}/server/.m2/settings.xml \
        -Drevision=${REVISION} \
        -Dbuild.directory.prefix=${BUILD_DIRECTORY_PREFIX} \
        install 2>&1 | grep '^Download'
      check_error $?
    fi
  fi
}

function bundle_client {
  npm run prodClient --prefix ${REPO_ROOT}/client
  check_error $?
}

function build_server {
  mvn -f ${REPO_ROOT}/server --global-settings ${REPO_ROOT}/server/.m2/settings.xml -Drevision=${REVISION} -Dbuild.directory.prefix=${BUILD_DIRECTORY_PREFIX} package $@
  check_error $?
}

function run_client_tests {
  npm run test --prefix ${REPO_ROOT}/client
  check_error $?
}

function run_server_and_hotloader {
  npm run dev --prefix ${REPO_ROOT}/client
  check_error $?
}

function run_server {
  npm run server --prefix ${REPO_ROOT}/client
  check_error $?
}


# parse args
PARAMS=""
while (( "$#" )); do
  case "$1" in
    -h|--help)
      usage;
      exit 0;
      ;;
    -e|--env)
      if [ -n "$2" ] && [ ${2:0:1} != "-" ]; then
        if [[ "$2" != "dev" && "$2" != "prod" ]]; then
          echo "\"$2\" is not a valid environment choice";
          usage;
          exit;
        fi
        CS314_ENV=$2
        shift 2
      else
        echo "argument missing for -- $1" >&2
        exit 1
      fi
      ;;
    -*|--*=) # unsupported flags
      echo "unrecognized option -- $(echo $1 | sed 's~^-*~~')" >&2
      usage;
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done

eval set -- "$PARAMS";

if [[ -z "$CS314_ENV" ]]; then
  CS314_ENV=dev;
fi;

echo "Building and Starting the Application in $([[ "$CS314_ENV" == "dev" ]] && echo 'DEVELOPMENT' || echo 'PRODUCTION' ) Mode."

if [[ -n "${NFS_MOUNTED}" ]]; then
  mkdir -p ${BUILD_DIRECTORY_PREFIX}/target 
  if [[ ! -L "${REPO_ROOT}/target" && -d "${REPO_ROOT}/target" ]]; then
    echo "Cleaning NFS mounted target"
    rm -rf ${REPO_ROOT}/target
  fi
  ln -sf ${BUILD_DIRECTORY_PREFIX}/target ${REPO_ROOT}/target
  if [[ ! "$CS314_ENV" == "dev" ]]; then
    mkdir -p ${BUILD_DIRECTORY_PREFIX}/client/dist
    if [[ ! -L "${REPO_ROOT}/client/dist" && -d "${REPO_ROOT}/client/dist" ]]; then
      echo "Cleaning NFS mounted client/dist"
      rm -rf ${REPO_ROOT}/client/dist
    fi
    ln -sf ${BUILD_DIRECTORY_PREFIX}/client/dist ${REPO_ROOT}/client/dist
  fi
fi

# install dependencies
install_client_dependencies
install_server_dependencies

# test client
run_client_tests

if [[ "$CS314_ENV" == "dev" ]]; then
  build_server
  run_server_and_hotloader 
else
  bundle_client
  build_server
  run_server
fi
