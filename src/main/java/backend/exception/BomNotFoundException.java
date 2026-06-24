package backend.exception;

public class BomNotFoundException extends RuntimeException {

    public BomNotFoundException(String message) {
        super(message);
    }
}