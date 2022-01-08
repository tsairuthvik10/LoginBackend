const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {

//Routes
//you visit a website using a GET method
app.get('/account', async (req, res) => {

		const {_username, _password} = req.query;
		if(_username == null || _password == null)
		{
			res.send("Invalid credentials");
			return;
		}
			
		var userAccount = await Account.findOne({username: _username});
		if(userAccount == null)
		{
			//create a new account
			console.log("create a new account");

			var newAccount = new Account({
				username: _username,
				password: _password,

				lastAuthentication: Date.now()
			});
			await newAccount.save();

			res.send(newAccount);
			return;
		}
		else
		{
			if(_password == userAccount.password)
			{
				userAccount.lastAuthentication = Date.now();
				await userAccount.save();

				console.log("retrieving account");
				res.send(userAccount);
			}
		}
});
}
