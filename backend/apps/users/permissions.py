from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return getattr(obj, "owner", None) == request.user

class IsAdminOrOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return False
        if request.user.is_superuser or request.user.is_staff:
            return True
        return getattr(obj, "owner", None) == request.user

class IsAdminOrSelf(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return False
        return request.user.is_superuser or request.user.is_staff or obj == request.user

class IsAdminOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS
            or request.user.is_superuser
            or request.user.is_staff
        )

class HasVerifiedEmail(BasePermission):

    message = "Email not verified"
    
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        return request.user.email_verified
