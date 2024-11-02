#! /bin/env bash

set -e

mkdir build -p
cp ./io.github.haryp2309.MessengerGnome.desktop ./build/io.github.haryp2309.MessengerGnome.Devel.desktop
cp ./io.github.haryp2309.MessengerGnome.yml ./build/io.github.haryp2309.MessengerGnome.Devel.yml
cp -r ./generated-sources.json ./media ./build/
cd build
sed -i 's/io.github.haryp2309.MessengerGnome/io.github.haryp2309.MessengerGnome.Devel/g' *.desktop *.yml *.json
flatpak-builder build io.github.haryp2309.MessengerGnome.Devel.yml --install-deps-from=flathub --force-clean --user --install
