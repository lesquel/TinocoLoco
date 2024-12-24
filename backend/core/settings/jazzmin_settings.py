JAZZMIN_SETTINGS = {
    #
    "site_title": "Library Admin",
    "site_header": "Library",
    "site_brand": "Library",
    "site_logo": None,
    "login_logo": None,
    "login_logo_dark": None,
    "site_logo_classes": "img-circle",
    "site_icon": None,
    "welcome_sign": "Welcome to the library",
    "copyright": "Acme Library Ltd",
    "search_model": ["users.CustomUser", "services.Service", "events.Event"],
    "user_avatar": None,
    # Top Menu #
    ############
    # Links to put along the top menu
    "topmenu_links": [
        # Url that gets reversed (Permissions can be added)
        {"name": "Home", "url": "admin:index",},
        # external url that opens in a new window (Permissions can be added)
        {
            "name": "Support",
            "url": "https://github.com/farridav/django-jazzmin/issues",
            "new_window": True,
        },
        # {"model": "events.Event", "model": "services.Service"},
        
        # {"app": "users"},
    ],

    "usermenu_links": [
        {
            "name": "Support",
            "url": "https://github.com/farridav/django-jazzmin/issues",
            "new_window": True,
        },
        {"model": "auth.user"},
    ],

    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": ["auth", "rest_framework"],
    "hide_models": ["auth.Group"],

"icons": {
    "auth": "fas fa-users-cog", 
    "auth.Group": "fas fa-users", 
    "users.customuser": "fas fa-user", 
    "users.PasswordResetCode": "fas fa-unlock-alt", 
    "business_configuration.BusinessConfiguration": "fas fa-cogs", 
    "contingencies.Contingency": "fas fa-exclamation-triangle", 
    "event_rentals.EventRental": "fas fa-calendar-check", 
    "event_rentals.RentalStatusHistory": "fas fa-history", 
    "event_rentals.ServicesEventRental": "fas fa-concierge-bell", 
    "events.EventCategory": "fas fa-folder-open", 
    "events.Event": "fas fa-calendar-day", 
    "photos.Photo": "fas fa-camera", 
    "promotions.PromotionCategory": "fas fa-tags", 
    "promotions.Promotion": "fas fa-bullhorn", 
    "reviews.Review": "fas fa-star-half-alt", 
    "services.ServiceCategory": "fas fa-th-list", 
    "services.Service": "fas fa-concierge-bell", 
},

    "use_google_fonts_cdn": True,
    "show_ui_builder": True,
}
