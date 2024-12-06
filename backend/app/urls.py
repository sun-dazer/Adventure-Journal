from django.urls import path

from . import views


urlpatterns = [
    path("register", views.register, name="register"), # Input: account info Output: success or failure
    path("login", views.login, name="login"), # Input: username+password Output: success or failure
    path("logout/", views.logout, name="logout"), # Input: _ Output: success or failure
    path("deregister", views.deregister, name="deregister"), # Input: username+password Output: success or failure
    path("save-tip/", views.save_tip_view, name="save-tip"), # Input: tips content Output: success or failure
    path("get-tips/", views.get_tips_view, name="get-tips"), # Input: _ Output: all tips
    path('update-profile/', views.update_profile_view, name='update_profile'),
    path('get-profile/', views.get_profile_view, name='get_profile'),
    path("check-login/", views.check_login_status, name="check-login"),
    path("upvote-tip/", views.upvote_tip, name="upvote_tip"), # Input: tipID Output: success or failure
    path("get_user_info/", views.get_user_info, name="get_user_info"), # Input: username Output: profile information
    path("follow/", views.follow, name="follow"), # Input: usernameToFollow Output: success or failure
    path("save-post/", views.save_post_view, name="save-post"), # Input: post contents, location, and imageID Output: success or failure
    path("get-posts/", views.get_posts_view, name="get-posts"), # Input: _ Output: all posts
    path("upvote-post/", views.upvote_post, name="upvote_post"), # Input: postID Output: success or failure
    path("save_image/", views.save_image, name="save_image"), # Input: image (put image in body and make the data type image) Output: imageID
    path("get_image/", views.get_image, name="get_image"), # Input: imageID Output: image (put image in body and make the data type image)
]
