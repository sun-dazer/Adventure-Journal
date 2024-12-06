from pymongo import MongoClient
import datetime

client = MongoClient("mongodb://localhost:27017/")
        
def check(user, passw):
    with client.start_session(causal_consistency=True) as session:
        # Access the collection and attempt to find the account by username
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username": user})
        
        # Debugging: Print the retrieved account data
        print("Retrieved account:", account)

        # Check if the account exists and if the password matches
        if account:
            print("Account found for user:", user)
            print("Stored password:", account["password"])
            print("Provided password:", passw)
            return account["password"] == passw
        
        # If no account was found
        print("No account found with username:", user)
        return False

def make_account(first_name, last_name, dob, user, passw, bio, followers, following):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username":user})
        if account is not None:
            return False
        collection.insert_one({"first_name": first_name, "last_name": last_name, "dob": dob, "username":user, "password":passw, "bio":bio, "followers":followers, "following":following})
        return True

def delete_account(user, passw):
    if not check(user, passw):
        return False
    with client.start_session(causal_consistency=True) as session:
        client.get_database("local").get_collection("accounts").delete_many({"username":user})
    return False

#my tips
def save_tip(user, content):
    with client.start_session(causal_consistency=True) as session:
        # Save the tip in the `tips` collection
        collection = client.get_database("local").get_collection("tips")
        collection.insert_one({
            "username": user,
            "content": content,
            #changed here
            "created_at": datetime.datetime.utcnow(),
            "upvotes": 0
        })
        print(f"Tip saved for user {user}: {content}")
        return True

def get_tips():
    with client.start_session(causal_consistency=True) as session:
        # Retrieve all tips from the `tips` collection
        collection = client.get_database("local").get_collection("tips")
        tips = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id` field
        print(f"Retrieved tips: {tips}")
        return tips

import datetime
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

def save_hike_post(user, content, location):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("hike_posts")
        collection.insert_one({
            "username": user,
            "content": content,
            "location": location,
            "created_at": datetime.datetime.utcnow(),
            "upvotes": 0,
            "upvoted_by": []  # Track users who upvoted
        })
        print(f"Hike post saved for user {user}: {content}")
        return True

def get_hike_posts():
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("hike_posts")
        posts = list(collection.find({}, {"_id": 0, "upvoted_by": 0}))  # Exclude `upvoted_by`
        return posts

def upvote_hike_post(post_id, username):
    collection = client.get_database("local").get_collection("hike_posts")
    post = collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        return {"error": "Post not found."}
    if username in post.get("upvoted_by", []):
        return {"error": "You have already upvoted this post."}

    collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"upvotes": 1}, "$addToSet": {"upvoted_by": username}}
    )
    updated_post = collection.find_one({"_id": ObjectId(post_id)}, {"upvotes": 1})
    return {"msg": "Upvoted successfully!", "upvotes": updated_post["upvotes"]}

