package backend.dto;

public class BomLinkDTO {

    private Long id;
    private Long parentItemId;
    private Long childItemId;
    private Double quantity;

    public BomLinkDTO() {
    }

    public BomLinkDTO(Long id, Long parentItemId, Long childItemId, Double quantity) {
        this.id = id;
        this.parentItemId = parentItemId;
        this.childItemId = childItemId;
        this.quantity = quantity;
    }

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
}