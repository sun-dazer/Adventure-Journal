from django.shortcuts import render
from django.http import HttpResponse
from .mongo.main import check, make_account, delete_account, save_tip, get_tips
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .mongo.main import client

@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            first_name = data.get("firstName")
            last_name = data.get("lastName")
            dob = data.get("dob")
            username = data.get("username")
            password = data.get("password")
            
            # Pass all fields to make_account
            if make_account(first_name, last_name, dob, username, password):
                return JsonResponse({"msg": "Success"}, status=200)
            
            return JsonResponse({"msg": "Account already exists with that name!"}, status=400)
        
        except json.JSONDecodeError:
            return JsonResponse({"msg": "Invalid JSON format"}, status=400)


@csrf_exempt
def login(request):
    if request.method == "OPTIONS":
        # Set CORS headers for preflight request
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "X-CSRFToken, Content-Type"
        return response

    if request.method == "POST":
        # Parse JSON data from request body safely
        try:
            data = json.loads(request.body)
            print("Parsed data:", data)  # Debugging
        except json.JSONDecodeError:
            print("JSON decode error")
            return JsonResponse({"msg": "Invalid JSON format"}, status=400)

        # Extract and validate username and password
        username = data.get("username")
        password = data.get("password")
        print("Username:", username)  # Debugging
        print("Password:", password)  # Debugging

        if not username or not password:
            return JsonResponse({"msg": "Username and password are required."}, status=400)

        # Attempt to check credentials
        try:
            if check(username, password):
                request.session["username"] = username
                return JsonResponse({"msg": "Success"}, status=200)
            else:
                return JsonResponse({"msg": "Username or password were incorrect!"}, status=400)
        except Exception as e:
            # Catch any unexpected errors from `check`
            print("Unexpected error in check function:", e)
            return JsonResponse({"msg": "An unexpected error occurred."}, status=500)

    return JsonResponse({"msg": "Only POST requests are allowed"}, status=405)

@csrf_exempt
def logout(request):
    if request.method == "POST":
        # Clear the session
        request.session.flush()  # Removes all session data
        return JsonResponse({"msg": "Logout successful!"}, status=200)
    return JsonResponse({"msg": "Only POST requests are allowed"}, status=405)

@csrf_exempt
def deregister(request):
    if request.method == "POST":
        if delete_account(request.POST.get("username"), request.POST.get("password")):
            request.session.flush()
            return JsonResponse({"msg": "Success"}, status=200)
        return JsonResponse({"msg": "Account credentials incorrect!"}, status=400)

@csrf_exempt
def save_tip_view(request):
    print("save_tip_view called")  # Debug
    username = request.session.get('username')
    if not username:
        return JsonResponse({"msg": "User is not logged in!"}, status=403)
    
    if request.method == "POST":
        try:
            print("Request Body:", request.body) # debug
            data = json.loads(request.body)
            #username = data.get("username")
            content = data.get("content")

            if not username or not content:
                return JsonResponse({"msg": "Username and content are required."}, status=400)

            save_tip(username, content)
            print("Tip saved successfully!")  # Debug log
            return JsonResponse({"msg": "Tip saved successfully!"}, status=200)
        except json.JSONDecodeError:
            print("Invalid JSON format")  # Debug log
            return JsonResponse({"msg": "Invalid JSON format"}, status=400)

@csrf_exempt
def get_tips_view(request):
    
        username = request.session.get('username')
        if not username:
            return JsonResponse({"msg": "User is not logged in!"}, status=403)
        collection = client.get_database("local").get_collection("tips")
        tips = list(collection.find({}, {"_id": 0}))
        #tips = get_tips()
        return JsonResponse({"tips": tips}, safe=False, status=200)