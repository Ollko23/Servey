const express = require("express")
const router = express.Router()
const Response = require("../models/response")

// Index
router.get("/", (req, res) => {
    res.render("index")
})

// New
router.get("/new", (req, res) => {
    const questions = {
        question1: ["Niemiecki", "Hiszpański", "Włoski", "Francuski", "Rosyjski", "Inny", "Nie dotyczy"],
        question2: ["Niemiecki", "Hiszpański", "Włoski", "Francuski", "Rosyjski", "Portugalski", "Grecki", "Norweski", "Szwedzki", "Fiński", "Mandaryński ", "Japoński", "Koreański", "Arabski", "Turecki", "Hindi", "Inny"],
        question3: ["Niemiecki", "Hiszpański", "Włoski", "Francuski", "Rosyjski", "Inny", "Nie dotyczy"],
        question4: ["Tak", "Nie", "Nie dotyczy"],
        question5: ["Tak", "Nie", "Nie dotyczy"],
        question6: ["1", "1+", "2", "2+", "3", "3+", "4", "4+", "5", "5+", "6", "Nie dotyczy"],
        question7: ["Rodzice", "Koledzy/koleżanki", "Lubię nauczyciela, który prowadzi przedmiot", "Chęć poznania nowego jezyka", "Jest przydatny w pracy", "Jest przydatny w życiu", "Chcę mieszkać w kraju gdzie jest on ojczysty", "Ładnie brzmi", "Jest łatwy", "Trochę już znam ten jezyk i chciałem/chciałam się go lepiej nauczyć", "Nie ma powodu - coś trzeba było wybrać i tyle", "Inne", "Nie dotyczy"],
        question8: ["Brzmienie", "Przydatność w życiu codziennym", "Przydatność w pracy", "Łatwość nauczenia się", "Egzotyczność", "Gramatyka", "Popularność", "Prestiż", "Inne"]
    }
    try {
        res.render("survey/survey", { questions: questions })
    } catch (err) {

        console.log("Error getting /new")
        console.log(err)
        res.redirect("/")
    }
})

// Post 
router.post("/", async (req, res) => {
    const response = new Response({
        answer1: req.body[1],
        answer2: req.body[2],
        answer3: req.body[2],
        answer4: req.body[4],
        answer5: req.body[5],
        answer6: req.body[6],
        answer7: req.body[7],
        answer8: req.body[8],
    })
    const params = { response: response }
    try {
        const newResponse = await response.save()
        res.redirect(`/${newResponse.id}`)
    } catch (err) {
        console.log("Error posting")
        console.log(err)
        try {
            params.errorMessage = 'Error Creating Response'
            res.redirect("survey/survey")
        } catch (err) {
            console.log("Error sending errorMessage and redirecting to survey/survey")
            console.log(err)
            res.redirect('/')
        }
    }
})

// Show results
// router.get("/show", async (req, res) => {
//     let searchOptions = {}
//     if (req.query.question1 != null && req.query.question1 !== '') {
//         searchOptions.answer1 = req.query.question1
//     }
//     try {
//         const responses = await Response.find(searchOptions)
//         res.render("survey/show", { responses: responses })
//     } catch (err) {
//    console.log("Error getting /show")
//         console.log(err)
//         res.redirect("/")
//     }
// })

// Show results follow
// router.get("/show/results", async (req, res) => {
//     try {
//         const responses = await Response.find({ answer1: "a1" })
//         res.render("survey/results", { responses: responses })
//     } catch (e) {
//    console.log("Error getting /show/results")
//         console.log(e)
//         params.errorMessage = "not found"
//         res.redirect("/show")
// render("/show", params)
//     }
// })

// Show Survey
router.get('/:id', async (req, res) => {
    try {
        const response = await Response.findById(req.params.id)
        res.render('survey/thankyou', { response: response })
    } catch (err) {
        // console.log("Error getting /:id")
        // console.log(err)
        res.redirect('/')
    }
})

module.exports = router

// functions for analysis

// Q1
// const counting = async function (answer, answers){
//     let obj = {}
//     for(item in answers){
//     let results = await Response.countDocuments({ answer: item })
//       obj.item = results
//     }
//   console.log(obj)
//     return obj
//   }

// Q2