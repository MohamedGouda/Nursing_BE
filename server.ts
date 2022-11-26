import App from './app';
const port = process.env.PORT;

App.listen(port, () => {
    console.log(`server started at port ${port}`);
});


