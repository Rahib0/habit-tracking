const db = require('../db_config/config');

const User = require('./User');

class Habit {
    constructor(data){
        this.habit_id = data.habit_data_id
        this.id = data.user_id
        this.habit = data.habit 
        this.frequency = data.frequency
        this.goal = data.goal
        this.units = data.units
        this.streak = data.streak
    }

    // function to display all users active habits 
    static allUserHabits(user_id){
        return new Promise(async (res, rej) => {
            try {
                let results = await db.query(`SELECT * from habits where user_ID = $1;`, [user_id]);
                let habits = results.rows.map(r => new Habit(r));
                res(habits);
            } catch (err) {
                rej(`Error retrieving habits: ${err}`)
            }
        })
    };

    static OneUserHabit(habit_id){
        return new Promise (async (resolve, reject) => {
            try {
                let results = await db.query('SELECT * from habits where habit_ID = $1;',
                                                [habit_id]);
                if (results.rows.length){
                    let habit = new Habit(results.rows[0]);
                    resolve(habit)
                } else {
                    throw 'This user has no habits with this habit_id'
                }
            } catch (err)  {
                reject(`Error retrieving the habit: ${err}`)
            }
        })
    };

    // function to allow users to add new habits 
    // remind frontend to send user_ID
    // looks good
    static create(habitData){
        return new Promise (async (resolve, reject) => {
            try {
                const { habit, goal, units, user_ID} = habitData;
                let newHabit = await db.query('INSERT INTO habits (habit, goal, units, user_ID) VALUES ($1, $2, $3, $4) RETURNING *;',
                                            [ habit, goal, units, user_id ]);
                let r = new Habit(newHabit.rows[0])
                resolve(r);
            } catch (err) {
                reject('Habit could not be created');
            }
        })
    };

    get destroy(){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM habits WHERE habit_id = $1 RETURNING user_ID', [this.habit_id])
                resolve(`Habit ${result.habit} was deleted`)
            } catch (err) {
                reject('Habit could not be deleted')
            }
        })
    };

    static get everything() {
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * from habits;`);
                let habits = result.rows.map(r => new Habit(r))
                res(habits)
            } catch (err) {
                rej(`Error retrieving habits: ${err}`)
            }
        })
    }


}

module.exports = Habit;

