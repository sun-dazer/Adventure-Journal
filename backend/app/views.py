from django.shortcuts import render
from django.http import HttpResponse
from .mongo.main import check, make_account, delete_account, save_tip, get_tips
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .mongo.main import client
from bson import ObjectId

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
            bio = ""
            followers = []
            following = []
            
            # Pass all fields to make_account
            if make_account(first_name, last_name, dob, username, password, bio, followers, following):
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
    if request.method == "GET":
        collection = client.get_database("local").get_collection("tips")
        tips_cursor = collection.find({}, {"username": 1, "content": 1, "created_at": 1, "upvotes": 1})
        tips = []
        for tip in tips_cursor:
            tip['id'] = str(tip['_id'])  # Convert ObjectId to string and assign to 'id'
            del tip['_id']  # Remove the original '_id' field
            tips.append(tip)
        return JsonResponse({"tips": tips}, safe=False, status=200)
    return JsonResponse({"msg": "Only GET requests are allowed"}, status=405)

@csrf_exempt
def get_profile_view(request):
    if request.method == "GET":
        # Get the username from the session
        username = request.session.get('username')

        if not username:
            return JsonResponse({"msg": "User is not logged in!"}, status=403)
        
        # Fetch the user's profile from the database
        collection = client.get_database("local").get_collection("accounts")
        profile = collection.find_one({"username": username}, {"_id": 0, "password": 0})  # Exclude sensitive fields
        
        if not profile:
            return JsonResponse({"msg": "Profile not found!"}, status=404)
        
        # Return the profile information
        return JsonResponse({"profile": profile}, status=200)
    
    return JsonResponse({"msg": "Only GET requests are allowed"}, status=405)

@csrf_exempt
def update_profile_view(request):
    if request.method == "POST":
        try:
            username = request.session.get('username')
            if not username:
                return JsonResponse({"msg": "User is not logged in!"}, status=403)

            data = json.loads(request.body)
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            bio = data.get("bio")  #maybe added next?

            collection = client.get_database("local").get_collection("accounts")
            collection.update_one(
                {"username": username},
                {"$set": {"first_name": first_name, "last_name": last_name, "bio": bio}}
            )
            return JsonResponse({"msg": "Profile updated successfully!"}, status=200)
        except Exception as e:
            return JsonResponse({"msg": f"Error updating profile: {e}"}, status=500)
    return JsonResponse({"msg": "Only POST requests are allowed"}, status=405)

@csrf_exempt
def check_login_status(request):
    username = request.session.get("username")  # Retrieve the username from the session
    if username:
        return JsonResponse({"is_logged_in": True, "username": username}, status=200)
    return JsonResponse({"is_logged_in": False}, status=200)

@csrf_exempt
def follow_user(request):
    if request.method == "POST":
        # Check if user is logged in
        username = request.session.get("username")
        if not username:
            return JsonResponse({"msg": "User not logged in."}, status=403)
        
        data = json.loads(request.body)
        user_to_follow = data.get("user_to_follow")
        
        if not user_to_follow:
            return JsonResponse({"msg": "No user specified to follow."}, status=400)
        if user_to_follow == username:
            return JsonResponse({"msg": "You cannot follow yourself!"}, status=400)

        accounts = client.get_database("local").get_collection("accounts")
        
        # Add user_to_follow to the current user's "following"
        accounts.update_one(
          {"username": username},
          {"$addToSet": {"following": user_to_follow}}
        )

        # Add current user to user_to_follow's "followers"
        accounts.update_one(
          {"username": user_to_follow},
          {"$addToSet": {"followers": username}}
        )

        return JsonResponse({"msg": "Followed successfully!"}, status=200)
    return JsonResponse({"msg": "Only POST requests are allowed"}, status=405)

@csrf_exempt
def unfollow_user(request):
    if request.method == "POST":
        username = request.session.get("username")
        if not username:
            return JsonResponse({"msg": "User not logged in."}, status=403)
        
        data = json.loads(request.body)
        user_to_unfollow = data.get("user_to_unfollow")

        if not user_to_unfollow:
            return JsonResponse({"msg": "No user specified to unfollow."}, status=400)

        accounts = client.get_database("local").get_collection("accounts")

        
        accounts.update_one(
          {"username": username},
          {"$pull": {"following": user_to_unfollow}}
        )

        # Remove current user from other follower
        accounts.update_one(
          {"username": user_to_unfollow},
          {"$pull": {"followers": username}}
        )

        return JsonResponse({"msg": "Unfollowed successfully!"}, status=200)
    return JsonResponse({"msg": "Only POST requests are allowed"}, status=405)

@csrf_exempt
def get_user_profile_view(request):
    if request.method == "GET":
        # username provided as a query param, e.g. /get-user-profile/?username=alice
        user_to_view = request.GET.get('username')
        if not user_to_view:
            return JsonResponse({"msg": "No username provided."}, status=400)

        collection = client.get_database("local").get_collection("accounts")
        profile = collection.find_one({"username": user_to_view}, {"_id": 0, "password": 0})

        if not profile:
            return JsonResponse({"msg": "User not found!"}, status=404)

        return JsonResponse({"profile": profile}, status=200)
    return JsonResponse({"msg": "Only GET requests are allowed"}, status=405)

@csrf_exempt
def upvote_tip_view(request):
    if request.method == "POST":
        # Check if user is logged in
        username = request.session.get("username")
        if not username:
            return JsonResponse({"msg": "User is not logged in."}, status=403)
        
        try:
            data = json.loads(request.body)
            tip_id = data.get("tip_id")
            if not tip_id:
                return JsonResponse({"msg": "No tip_id provided."}, status=400)
            
            collection = client.get_database("local").get_collection("tips")
            
            # Check if the user has already upvoted
            tip = collection.find_one({"_id": ObjectId(tip_id)})
            if not tip:
                return JsonResponse({"msg": "Tip not found."}, status=404)
            
            if username in tip.get("upvoted_by", []):
                return JsonResponse({"msg": "You have already upvoted this tip.", "upvotes": tip.get("upvotes", 0)}, status=400)
            
            # Add username to 'upvoted_by' and increment 'upvotes'
            result = collection.update_one(
                {"_id": ObjectId(tip_id)},
                {
                    "$inc": {"upvotes": 1},
                    "$addToSet": {"upvoted_by": username}
                }
            )
            
            if result.modified_count == 0:
                return JsonResponse({"msg": "Failed to upvote tip."}, status=500)
            
            # Retrieve the updated upvote count
            updated_tip = collection.find_one({"_id": ObjectId(tip_id)}, {"upvotes": 1})
            return JsonResponse({"msg": "Upvoted successfully!", "upvotes": updated_tip["upvotes"]}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"msg": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"msg": f"Error upvoting tip: {str(e)}"}, status=500)
    return JsonResponse({"msg": "Only POST requests are allowed"}, status=405)