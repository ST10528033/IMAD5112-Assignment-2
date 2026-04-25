package com.example.hackormyth

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class ScoreActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_score)

        val scoreText = findViewById<TextView>(R.id.scoreText)
        val feedbackText = findViewById<TextView>(R.id.feedbackText)
        val reviewBtn = findViewById<Button>(R.id.reviewBtn)

        val score = intent.getIntExtra("score", 0)
        val total = intent.getIntExtra("total", 0)

        scoreText.text = "Score: $score/$total"

        feedbackText.text = when {
            score == total -> "Master Hacker!"
            score >= total / 2 -> "Great job!"
            else -> "Keep practicing!"
        }

        reviewBtn.setOnClickListener {
            Toast.makeText(this, "Review feature coming soon!", Toast.LENGTH_LONG).show()
        }
    }
}