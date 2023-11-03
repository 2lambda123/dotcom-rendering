#!/usr/bin/env bash

# check whether the versions of Node set throughout the project match the nvmrc
# version

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

# get the node version from .nvmrc
nvmrc_version=$(cat .nvmrc)

check_node_version() {
    local file_path="$1"
    local regex="$2"

    # Ensure the file exists
    if [[ ! -f "$file_path" ]]; then
        echo "File $file_path not found."
        return 1
    fi

    # Get the version from the file
    extracted_version=$(grep -Eo "$regex" "$file_path" | sed -E "s/$regex/\1/")

    # Compare versions
    if [[ "$nvmrc_version" == "$extracted_version" ]]; then
        log_with_color "${green}${file_path}${reset}${dim} uses Node ${green}$extracted_version${reset}"
    else
        log_with_color "${red}${file_path}${reset}${dim} does not use Node $nvmrc_version: ${red}$extracted_version${reset}${reset}"
        return 1
    fi
}

check_node_version "dotcom-rendering/Containerfile" \
	"^FROM node:([0-9.]+)-alpine"
check_node_version "dotcom-rendering/scripts/deploy/riff-raff.yaml" \
	"^ +Recipe: [^ ]+-node-([0-9.]+)$"
check_node_version "apps-rendering/riff-raff.yaml" \
	"^ +Recipe: [^ ]+-node([0-9.]+).*$"
