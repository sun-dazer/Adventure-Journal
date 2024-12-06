from django.urls import path

from . import views


urlpatterns = [
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("deregister", views.deregister, name="deregister"),
    path("save-tip/", views.save_tip_view, name="save-tip"),
    path("get-tips/", views.get_tips_view, name="get-tips"),
    path("upvote-tip/", views.upvote_tip_view, name="upvote_tip"),
    path('update-profile/', views.update_profile_view, name='update_profile'),
    path('get-profile/', views.get_profile_view, name='get_profile'),
    path("check-login/", views.check_login_status, name="check-login"),
    path("follow/", views.follow_user, name="follow_user"),
    path("unfollow/", views.unfollow_user, name="unfollow_user"),
    path("get-user-profile/", views.get_user_profile_view, name="get_user_profile"),
    path("upvote-tip/", views.upvote_tip_view, name="upvote_tip"),
]
