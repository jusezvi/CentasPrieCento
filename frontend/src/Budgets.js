import "./Budgets.css";
import React, { useState, useEffect } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { BiCar } from "react-icons/bi";
import { BiFoodMenu } from "react-icons/bi";
import { exVar } from "./ExtendVariables";
import UserCategory from "./UserCategory";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import UserCategoryChart from './charts/UserCategoryChart'

function Budgets({ user }) {
    const [category, setCategory] = useState("Automobilis");
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState("");
    const [error, setError] = useState(false);
    const [userCategories, setUserCategories] = useState([]);
    const [currentMonthCategorySum, setCurrentMonthCategorySum] = useState([]);
    const [allData, setAllData] = useState(null);
    let currentMonth = new Date().getMonth();

    useEffect(() => {

        fetch("http://localhost:8080/getCategory/")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCategories(data.data);
            });

        fetch('http://localhost:8080/getUserCategory/' + read_cookie('auth_access_token'))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUserCategories(data.data);
            });

        fetch('http://localhost:8080/getBudget/' + read_cookie('auth_access_token'))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAllData(data.data);
            });


    }, []);

    useEffect(() => {
        sumByCategory(allData);
    }, [allData])

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    function checkCat(c) {
        let res = null;
        userCategories.forEach((cat) => {
            if (c === cat.category) {
                alert('Tokia kategorija jau pasirinkta, prašome pasirinkti kitą');
                res = true;
            }
        });
        return res
    }

    function submitCategory(e) {
        e.preventDefault();
        if (!checkCat(category)) {
            if (!isNaN(Number(limit)) && limit > 0) {
                let correctLimit = financial(limit);
                const newCategoryLimit = {
                    user,
                    limit: correctLimit,
                    category: category,
                };
                console.log(newCategoryLimit)
                fetch('http://localhost:8080/insertUserCategory/' + JSON.stringify(newCategoryLimit), {
                    method: 'POST',
                    mode: 'cors',
                    headers: { "Content-Type": "application/json" }
                }).then(() => {
                    exVar.IS_NEW_EARNING = true;
                });
                setLimit("");
                setCategory("");
                setError(false);
                window.location.reload();
            } else {
                setError(true);
            }
        }

    }

    function sumByCategory(data) {

        let allCategoriesSum = [];
        categories.forEach((category) => {
            let categorySum = 0;
            data.forEach((d) => {
                if (
                    d.category === category.name &&
                    new Date(d.date).getMonth() === currentMonth
                ) {
                    categorySum += Number(d.sum);
                }
            });
            allCategoriesSum = [...allCategoriesSum, categorySum];

        });

        setCurrentMonthCategorySum(allCategoriesSum);
    }

    function findCatSum(c) {
        let rez = 0;
        categories.map((cat, i) => {
            if (c === cat.name) {
                rez = currentMonthCategorySum[i]
            }
        })
        return rez
    }

    function reset(e) {
        e.preventDefault();
        setLimit('');
        setError(false)
    }


    return (
        <div className="budgets">

            <h2>Piniginė</h2>
            <div className="budgets__main">
                {userCategories.map((cat, index) => (

                    <UserCategory
                        key={index}
                        limit={cat.limit}
                        category={cat.category}
                        user={cat.user}
                        catSum={findCatSum(cat.category)}
                        id={cat._id}
                    />
                ))}
            </div>
            <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#categories">
                Pridėti naują išlaidų kategoriją
            </button>

            <div className="insertCategory">
                <div
                    className="modal fade"
                    id="categories"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content transaction-modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Išlaidų kategorijos pridėjimas
                                </h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitCategory}>
                                    {error && (
                                        <p className="error">
                                            Įvestas gali būti tik skaičius ir didesnis už 0 (pvz.
                                            50.50)
                                        </p>
                                    )}
                                    <label>Pridėti kategoriją:</label>
                                    <select
                                        className="transactions-select-input"
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map((option) => (
                                            <option key={option._id} value={option.name}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label>Nustatyti išlaidų kategorijos limitą</label>
                                    <input className="transactions-select-input"
                                        type="text"
                                        value={limit}
                                        onChange={(e) => setLimit(e.target.value)}
                                    />
                                    <div className="modal-footer">
                                        <input type="submit" className="btn btn-secondary" value="Išsaugoti" />
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            onClick={reset}
                                        >
                                            Uždaryti
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UserCategoryChart userCategories={userCategories} currentMonthCategorySum={currentMonthCategorySum} categories={categories} />
        </div>
    );
}

export default Budgets;
