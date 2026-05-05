import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-pro')

def breakdown_task(title: str, description: str = ""):
    prompt = f"""
    You are a task management assistant. Break down the following complex task into 3-7 actionable sub-tasks.
    Return ONLY a JSON array of strings representing the sub-task titles.
    
    Task Title: {title}
    Task Description: {description}
    
    Example output: ["Sub-task 1", "Sub-task 2", "Sub-task 3"]
    """
    
    try:
        print(f"Calling Gemini API for task: {title}")
        response = model.generate_content(prompt)
        # Clean up the response to ensure it's valid JSON
        text = response.text.strip()
        print(f"Gemini API raw response: {text}")
        
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()
            
        subtasks = json.loads(text)
        return subtasks
    except Exception as e:
        print(f"Error calling Gemini API: {str(e)}")
        # Return some default subtasks if API fails so it doesn't hang
        return ["Research task", "Plan execution", "Complete task"]
