from django.urls import path

from . import views


urlpatterns = [
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("deregister", views.deregister, name="deregister"),
    path("save-tip/", views.save_tip_view, name="save-tip"),
    path("get-tips/", views.get_tips_view, name="get-tips"),
    path("upvote-tip/", views.upvote_tip, name="upvote_tip"),
    path("get_user_info/", views.get_user_info, name="get_user_info"),
    path("follow/", views.follow, name="follow"),
    path("save-post/", views.save_post_view, name="save-post"),
    path("get-posts/", views.get_posts_view, name="get-posts"),
    path("upvote-post/", views.upvote_post, name="upvote_post"),
    path("save_image/", views.save_image, name="save_image"),
    path("get_image/", views.get_image, name="get_image"),
]