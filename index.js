import app from './app'

app.listen(app.get('port'), () => {
    console.log(`API is running on port ${app.get('port')}`);
})