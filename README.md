# codequiz
These assessments are typically a combination of multiple-choice questions.

The user arrives at the landing page and is presented with a call-to-action to "Start Quiz", Also in the top-right corner button to reset the quiz.

Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value = 0 and immediately begins count, Also on the right-bottom corner of the container you will find circles reflect the number of questions.

Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a point penalty (15 points are subtracted from the score).

When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in `localStorage`.

The application is adapts to multiple screen sizes.
