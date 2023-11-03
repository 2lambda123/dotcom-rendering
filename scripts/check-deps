#!/usr/bin/env bash

# Checks that deps have been specified correctly in package.json files

in_terminal() { test -t 1; }

strip_colors() {
    local text="$1"
    printf "$text" | sed -e $'s/\x1b\[[0-9;]*m//g'
}

log_with_color() {
    local text="$1"

    # Check if output is a terminal and supports color
    if in_terminal && [[ $(tput colors) -ge 8 ]]; then
        # Terminal supports color, print the text as it is
        echo -e "$text"
    else
        # Terminal does not support color, strip color codes and print
        echo "$(strip_colors "$text")"
    fi
}

dim='\033[2m'
red='\033[0;31m'
reset='\033[0m'
green='\033[0;32m'

check_for_devDeps() {
	if grep -q '"devDependencies":' ${1}; then
		log_with_color "${red}${1} contains \"devDependencies\"${reset}"
		log_with_color "${dim}Use \"dependencies\" instead: https://github.com/guardian/dotcom-rendering/pull/4001.${reset}"
		exit 1
	fi
}

check_for_devDeps "./package.json"
check_for_devDeps "./dotcom-rendering/package.json"

log_with_color "${green}No \"devDependencies\" in use.${reset}"

check_pinned_dependencies() {
    # Check if file path is provided
    if [[ -z "$1" ]]; then
        echo "Please provide a path to a package.json file."
        return 1
    fi

    # Check if the file exists
    if [[ ! -f "$1" ]]; then
        echo "File not found: $1"
        return 1
    fi

    # Extract the dependencies and check for *, ~ or ^
    local unpinned_deps=$(awk '/"dependencies": {/,/}/{ if ($0 ~ /[*~^]/) print $0 }' "$1")

    if [[ ! -z "$unpinned_deps" ]]; then
        log_with_color "${red}Unpinned dependencies found in ${1}:${reset}"
		echo "$unpinned_deps" | while read -r line; do
            echo "$line" | sed 's/^[ \t]*//'
        done
        return 1
    fi
}

check_pinned_dependencies "./dotcom-rendering/package.json"

log_with_color "${green}Dependencies are pinned.${reset}"
