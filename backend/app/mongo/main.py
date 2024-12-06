from pymongo import MongoClient
import datetime
from gridfs import GridFS

client = MongoClient("mongodb://localhost:27017/")
        
def check_db(user, passw):
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

def make_account_db(first_name, last_name, dob, user, passw):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username":user})
        if account is not None:
            return False
        collection.insert_one({"first_name": first_name, "last_name": last_name, "dob": dob, "username":user, "password":passw, "tips":[], "upvoted_tips":[], "posts":[], "upvoted_posts":[], "followers":[], "following":[]})
        return True

def delete_account_db(user, passw):
    if not check_db(user, passw):
        return False
    with client.start_session(causal_consistency=True) as session:
        client.get_database("local").get_collection("accounts").delete_many({"username":user})
    return False

def get_user_db(user):
    with client.start_session(causal_consistency=True) as session:
        return client.get_database("local").get_collection("accounts").find_one({"username":user})
    return None

#my tips
def save_tip_db(user, content):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username":user})
        if account is None:
            return False
        # Save the tip in the `tips` collection
        collection = client.get_database("local").get_collection("tips")
        result = collection.insert_one({
            "username": user,
            "content": content,
            #changed here
            "created_at": datetime.datetime.utcnow(),
            "upvotes": 0
        })
        print(f"Tip saved for user {user}: {content}")
        collection = client.get_database("local").get_collection("accounts")
        account["posts"].append(result.inserted_id)
        collection.update_one({"username":user}, {"$set":{"posts":account["posts"]}})
        return True
    return False

def get_tips_db():
    with client.start_session(causal_consistency=True) as session:
        # Retrieve all tips from the `tips` collection
        collection = client.get_database("local").get_collection("tips")
        tips = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id` field
        print(f"Retrieved tips: {tips}")
        return tips
    
def upvote_tip_db(username, tipID):
    user = get_user_db(username)
    if user is None or tipID in user["upvoted_tips"]:
        return False
    user["upvoted_tips"].append(tipID)
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        collection.update_one({"username":username}, {"$set":{"upvoted_tips":user["upvoted_tips"]}})
    return True
    
def follow_db(username, otherUsername):
    user = get_user_db(username)
    otherUser = get_user_db(otherUser)
    if user is None or otherUser is None or otherUsername in user["following"]:
        return False
    user["following"].append(otherUsername)
    otherUser["followers"].append(username)
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        collection.update_one({"username":username}, {"$set":{"following":user["following"]}})
        collection.update_one({"username":otherUsername}, {"$set":{"followers":otherUser["followers"]}})
    return True

#my tips
def save_post_db(user, content, location, image):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username":user})
        if account is None:
            return False
        # Save the tip in the `tips` collection
        collection = client.get_database("local").get_collection("posts")
        result = collection.insert_one({
            "username": user,
            "content": content,
            "location": location,
            "image": image,
            "created_at": datetime.datetime.utcnow(),
            "upvotes": 0
        })
        print(f"Tip saved for user {user}: {content}")
        collection = client.get_database("local").get_collection("accounts")
        account["posts"].append(result.inserted_id)
        collection.update_one({"username":user}, {"$set":{"posts":account["posts"]}})
        return True
    return False

def get_posts_db():
    with client.start_session(causal_consistency=True) as session:
        # Retrieve all tips from the `tips` collection
        collection = client.get_database("local").get_collection("posts")
        post = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id` field
        print(f"Retrieved posts: {post}")
        return post
    
def upvote_post_db(username, tipID):
    user = get_user_db(username)
    if user is None or tipID in user["upvoted_posts"]:
        return False
    user["upvoted_posts"].append(tipID)
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        collection.update_one({"username":username}, {"$set":{"upvoted_posts":user["upvoted_posts"]}})
    return True
    
def save_image_db(image):
    fs = GridFS(client.get_database("local").get_collection("images"))
    return fs.put(image)

def get_image_db(imageID):
    fs = GridFS(client.get_database("local").get_collection("images"))
    return fs.get(imageID)