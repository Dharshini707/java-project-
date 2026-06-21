package backend.dto;

public class BomLinkDTO {

    private Long id;
    private Long parentItemId;
    private Long childItemId;
    private Double quantity;
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