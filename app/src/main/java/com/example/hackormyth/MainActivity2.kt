package com.example.hackormyth

import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class QuizActivity : AppCompatActivity() {

    private lateinit var questionText: TextView
    private lateinit var feedbackText: TextView
    private lateinit var trueBtn: Button
    private lateinit var falseBtn: Button
    private lateinit var nextBtn: Button

    private lateinit var questions: ArrayList<Question>
    private var currentIndex = 0
    private var score = 0
    private var answered = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz)

        questionText = findViewById(R.id.questionText)
        feedbackText = findViewById(R.id.feedbackText)
        trueBtn = findViewById(R.id.trueBtn)
        falseBtn = findViewById(R.id.falseBtn)
        nextBtn = findViewById(R.id.nextBtn)

        loadQuestions()
        showQuestion()

        trueBtn.setOnClickListener { checkAnswer(true) }
        falseBtn.setOnClickListener { checkAnswer(false) }
        nextBtn.setOnClickListener { nextQuestion() }
    }

    private fun loadQuestions() {
        questions = arrayListOf(
            Question("Using airplane mode saves battery faster.", true, "It reduces background activity."),
            Question("Charging overnight damages modern phones.", false, "Phones stop charging automatically."),
            Question("Incognito mode makes you anonymous.", false, "It only hides local history.")
        )
    }

    private fun showQuestion() {
        answered = false
        feedbackText.text = ""
        questionText.text = questions[currentIndex].statement
    }

    private fun checkAnswer(userAnswer: Boolean) {
        if (answered) return

        val q = questions[currentIndex]
        answered = true

        if (userAnswer == q.answer) {
            score++
            feedbackText.text = "Correct! ${q.explanation}"
        } else {
            feedbackText.text = "Wrong! ${q.explanation}"
        }
    }

    private fun nextQuestion() {
        if (!answered) {
            Toast.makeText(this, "Please answer before continuing!", Toast.LENGTH_SHORT)
            return
        }

        currentIndex++

        if (currentIndex < questions.size) {
            showQuestion()
        } else {
            val intent = Intent(this, ScoreActivity::class.java)
            intent.putExtra("score", score)
            intent.putExtra("total", questions.size)
            startActivity(intent)
            finish()
        }
    }
}

