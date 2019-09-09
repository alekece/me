# Me

* [Requirements](#requirements)
* [Build](#build)
* [How to use it](#how-to-use-it)
* [License](#license)

[Me](http://me.alekece.site) is my showcase website; feel free to use as a scaffolder for your one.

## Requirements
* nodejs
* npm

This project is based on **_angular_** as a build system so you should install it before starting.

``` sh
npm install -g @angular/cli
npm install
```

## Configuration

You can find a `.env.example` at the root directory. This file contains variables mandatory for enable the following services :
* [Google analytics](https://analytics.google.com/analytics/web/)
* [emailjs](https://www.emailjs.com/)

Rename `.env.example` to `.env` and modify the content with your own values then run `npm run config`.

## Build

Run`npm run build` to build the project.
The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## How to use it

Run `npm run start` to deploy the project locally; you can access it via `localhost:4200` in your favorite browser.
 
## License

Copyright © 2020 Alexis Le Provost. See LICENSE for details.
