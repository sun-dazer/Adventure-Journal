from django.shortcuts import render
from django.http import HttpResponse
from .mongo.main import check, make_account, delete_account
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse

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
                return JsonResponse({"msg": "Success"}, status=200)
            else:
                return JsonResponse({"msg": "Username or password were incorrect!"}, status=400)
        except Exception as e:
            # Catch any unexpected errors from `check`
            print("Unexpected error in check function:", e)
            return JsonResponse({"msg": "An unexpected error occurred."}, status=500)

    return JsonResponse({"msg": "Only POST requests are allowed"}, status=405)


@csrf_exempt
def deregister(request):
    if request.method == "POST":
        if delete_account(request.POST.get("username"), request.POST.get("password")):
            return JsonResponse({"msg": "Success"}, status=200)
        return JsonResponse({"msg": "Account credentials incorrect!"}, status=400)