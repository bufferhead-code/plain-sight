# Plain Sight

**You can learn more about how it works and how i made it [here](http://www.youtube.com/watch?v=q71Z3RBvzIA)**

[![This image is my password](http://img.youtube.com/vi/q71Z3RBvzIA/0.jpg)](http://www.youtube.com/watch?v=q71Z3RBvzIA 'This image is my password')

The browser extension that allows you to use images as passwords. Just drag & drop your password image on any password input field and it will automatically decrypt the password image.

## How to create password images

The Plain Sight Browser Extension supports LSB steganography and AES encryption to decrypt your passwords. 
You can f.e. use the [Digi-Cloak](https://kaushalmeena.github.io/digi-cloak/) web app to create password images.

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.