const { logout } = require("./auth");

async function getHabits(username) {
	try {
		const options = {
			headers: new Headers({ Authorization: localStorage.getItem("token") })
		};
		const response = await fetch("http://localhost:3000/URL", options); // get correct route to get names of all habits
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			logout();
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function getInfoAboutHabit(id) {
	try {
		const options = {
			headers: new Headers({ Authorization: localStorage.getItem("token") })
		};
		const response = await fetch("http://localhost:3000/URL", options); // get correct route to get details of the habit
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			logout();
		}
	} catch (err) {
		console.warn(err);
	}
}

async function updateHabit(e) {
	try {
		e.preventDefault();
		const habitId = e.target.id;
		const value = e.target.value;
		const userId = localStorage.getItem("userId");
		const options = {
			method: "POST",
			headers: new Headers({
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json"
			}),
			body: JSON.stringify({ user_ID: userId, habit_ID: habitId, amount: value })
		};
		const response = await fetch("URL", options); //get route for updating the habit
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function addHabit(e) {
	try {
		e.preventDefault();
		const options = {
			method: "POST",
			headers: new Headers({
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
		};
		const r = await fetch(`url..`, options);
		const data = await r.json();
		if (data.err) {
			console.warn(data.err);
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

module.exports = { getHabits, updateHabit, getInfoAboutHabit, addHabit };
