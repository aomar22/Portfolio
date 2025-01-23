import random
import tkinter as tk  # Using tkinter library for GUI
from tkinter import messagebox

# Function to generate a random math question
def generate_question():
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)
    operation = random.choice(['+', '-', '*'])  # Randomly select an operation
    question = f"{num1} {operation} {num2}"
    correct_answer = eval(question)  # Evaluate the math expression
    return question, correct_answer

# Function to check the answer
def check_answer():
    global correct_answer, score
    try:
        user_answer = int(answer_entry.get())  # Get user input
        if user_answer == correct_answer:
            messagebox.showinfo("Correct!", "Great job! That's the right answer.")
            score += 1
        else:
            messagebox.showerror("Incorrect", f"Oops! The correct answer was {correct_answer}.")
    except ValueError:
        messagebox.showwarning("Invalid Input", "Please enter a valid number.")
    
    # Generate the next question
    new_question()

# Function to display a new question
def new_question():
    global correct_answer
    question, correct_answer = generate_question()
    question_label.config(text=f"Question: {question}")
    answer_entry.delete(0, tk.END)  # Clear the entry box

# Function to exit the game
def exit_game():
    global score
    messagebox.showinfo("Game Over", f"You scored {score} points. Thanks for playing!")
    root.destroy()  # Close the Tkinter window

# Initialize the Tkinter window
root = tk.Tk()
root.title("Math Quiz Game")

# Score counter
score = 0

# Create GUI elements
question_label = tk.Label(root, text="", font=("Arial", 16))
question_label.pack(pady=10)

answer_entry = tk.Entry(root, font=("Arial", 14))
answer_entry.pack(pady=10)

check_button = tk.Button(root, text="Submit Answer", command=check_answer, font=("Arial", 14))
check_button.pack(pady=5)

exit_button = tk.Button(root, text="Exit", command=exit_game, font=("Arial", 14), bg="red", fg="white")
exit_button.pack(pady=5)

# Start the game with the first question
new_question()

# Run the Tkinter event loop
root.mainloop()
