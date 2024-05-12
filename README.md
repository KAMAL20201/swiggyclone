# Getting Started with VITE

This project was Created with Vite.

## Demo
Vercel deployment Link ([Swiggy Clone](https://swiggyclone-kamal.vercel.app))

## Tech Stack Used

1. **React** and **Javascript** for Frontend UI.
2. **Modular CSS** and **styled components** for styling.
3. **Express** as backend for adding neccessary headers to **Swiggy API** to avoid CORS and Razorpay Integration.
4. **Supabase** for User Authentication and Supabse DB for storing data.
5. **Redux Toolkit** for storing and managing Cart Related States.
6. Used **Context API** for managing User State and also for managing Modals State (Sign In Modal & Location Modal).


## APIs Used
1. **Razorpay** API for checkouts and payments ([Read Docs](https://razorpay.com/docs/api)) to know more 
2. **MapMyIndia** reverse Geocoding API ([Read Docs](https://github.com/MapmyIndia/mapmyindia-rest-api/tree/master/mapmyindia-maps-reverse-geocoding-rest-api-example)) to know more

## Cart Checkout
You can use Razorpay test Card Details to make Payments for Demo Use. 
| Card Network |  Card Number  | CVV | Expiry Date |
|:-------------|:-------------:|----:|------------:|
| Mastercard   | 5267 3181 8797 5449 | Random CVV | Any future date |
| Visa   |4111 1111 1111 1111 | Random CVV | Any future date |


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
