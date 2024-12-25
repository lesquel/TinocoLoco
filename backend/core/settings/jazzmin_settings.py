JAZZMIN_SETTINGS = {
    "site_logo_classes": "img-circle",
    "search_model": ["users.CustomUser",],
    "user_avatar": None,
    "order_with_respect_to": [
        "users",
    ],
    # "usermenu_links": [
    #     {
    #         "name": "Support",
    #         "url": "https://github.com/farridav/django-jazzmin/issues",
    #         "new_window": True,
    #     },
    #     {"model": "auth.user"},
    # ],
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": ["auth", "rest_framework"],
    "hide_models": ["auth.Group", "users.PasswordResetCode"],
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
    # "show_ui_builder": True,
}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": True,
    "brand_small_text": False,
    "brand_colour": "navbar-info",
    "accent": "accent-info",
    "navbar": "navbar-dark",
    "no_navbar_border": False,
    "navbar_fixed": False,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": False,
    "sidebar": "sidebar-dark-info",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": True,
    "sidebar_nav_legacy_style": True,
    "sidebar_nav_flat_style": False,
    "theme": "darkly",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success",
    },
}
