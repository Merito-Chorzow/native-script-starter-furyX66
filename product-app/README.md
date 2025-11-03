# Product app - NativeScript Angular
A mobile application built with NativeScript and Angular for managing products from the FakeStore API.

## Features
- Product List: Display products fetched from FakeStore API with title, description, price, and category
- Create Product: Add new products locally with auto-incrementing IDs
- Edit Product: Update existing product information
- Delete Product: Remove products from the list
- Loading State: Activity indicator while fetching data
- Haptic Feedback: Tactile feedback on button interactions

## To start project

1. Install dependencies:

    ```bash
    npm install
    ```

2. Install NativeScript CLI globally (if not already installed):

    ```bash
    npm install -g @nativescript/cli
    ```

3. Get NativeScript Preview app in your app store and run

    ```bash
    ns preview
    ```

4. Scan QR-code that appears in your console (See [NativeScript Preview](https://preview.nativescript.org))

### Api integration

- FakeStore API to get mock product list.
