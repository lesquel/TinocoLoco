from rest_framework import status

class BaseError(Exception):
    def __init__(self, message=None, code=None, identifier=None):
        self.identifier = identifier or "error"
        self.code = code or status.HTTP_500_INTERNAL_SERVER_ERROR
        super().__init__(self._serialize_errors(message))

    def _serialize_errors(self, errors):
        if isinstance(errors, list):
            return {self.identifier: [str(e) for e in errors]}

        if isinstance(errors, dict):
            serialized = {}
            for key, error_list in errors.items():
                serialized[key] = [str(e) for e in error_list]
            return serialized

        # Default case: wrap single message into the identifier key
        return {self.identifier: [str(errors)]}
