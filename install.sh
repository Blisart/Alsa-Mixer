#!/bin/bash

echo "Clonning extension..."
git clone https://github.com/Blisart/Alsa-Mixer.git Alsa-Mixer
echo "Creating extension folder..."
mkdir -p ~/.local/share/gnome-shell/extensions/Alsa-Mixer\@Blisart
echo "Installing extension..."
cp Alsa-Mixer/extension.js ~/.local/share/gnome-shell/extensions/Alsa-Mixer\@Blisart/
cp Alsa-Mixer/metadata.json ~/.local/share/gnome-shell/extensions/Alsa-Mixer\@Blisart/
echo "Cleaning..."
rm -rf Alsa-Mixer/
echo "Done!"
