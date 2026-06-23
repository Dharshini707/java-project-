package backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class BomLinkDTO {

    private Long id;

    @NotNull(message = "Parent Item ID is required")
    private Long parentItemId;

    @NotNull(message = "Child Item ID is required")
    private Long childItemId;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be greater than 0")
    private Double quantity;

    @NotBlank(message = "Unit cannot be empty")
    @Size(max = 10, message = "Unit cannot exceed 10 characters")
    private String unit;

    public BomLinkDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentItemId() {
        return parentItemId;
    }

    public void setParentItemId(Long parentItemId) {
        this.parentItemId = parentItemId;
    }

    public Long getChildItemId() {
        return childItemId;
    }

    public void setChildItemId(Long childItemId) {
        this.childItemId = childItemId;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}