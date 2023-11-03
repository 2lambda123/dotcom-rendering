#!/usr/bin/env bash

# Check that yarn is available. If not, ask the user to run `corepack enable`
# which will provide it. Note that any yarn@>1 will do, since it will defer to
# the copy in that lives in .yarn/releases (which is the version we want to
# use).

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

blue='\033[0;34m'
red='\033[0;31m'
dim='\033[2m'
reset='\033[0m'

if ! command -v yarn &> /dev/null; then
	log_with_color "${red}Could not find yarn. Please run 'corepack enable'.${reset}"
	exit 1
fi

log_with_color "${dim}Using yarn ${blue}$(yarn -v)${reset}"
