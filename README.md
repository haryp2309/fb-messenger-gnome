# Facebook Messenger for Gnome

This project aims to provide a more native-looking experience of using Facebook Messenger on Gnome through Electron. The project mainly supports Wayland.

![Messenger in Light Mode](assets/light-mode-example.png "Messenger in Light Mode")

## Test the app
> 💡 Currently, the app doesn't support rounded corners (see https://github.com/electron/electron/issues/33036). A workaround is to use this extension: [https://extensions.gnome.org/extension/1514/rounded-corners/](https://extensions.gnome.org/extension/1514/rounded-corners/)

### With Flatpak
Download and install the latest GitHub release for your architecture.

### With Node.js
 1. Clone the project
 2. Run `npm install`
 3. Run `npm start --enable-features=UseOzonePlatform --ozone-platform=wayland`
