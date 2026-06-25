package backend.dto;

import java.util.List;

public class BomTreeResponse {

    private Long id;
    private String parentItemName;
    private String childItemName;
    private Double quantity;

    private List<BomTreeResponse> children;

    public BomTreeResponse() {
    }

    public BomTreeResponse(Long id,
                           String parentItemName,
                           String childItemName,
                           Double quantity,
                           List<BomTreeResponse> children) {
        this.id = id;
        this.parentItemName = parentItemName;
        this.childItemName = childItemName;
        this.quantity = quantity;
        this.children = children;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentItemName() {
        return parentItemName;
    }

    public void setParentItemName(String parentItemName) {
        this.parentItemName = parentItemName;
    }

    public String getChildItemName() {
        return childItemName;
    }

    public void setChildItemName(String childItemName) {
        this.childItemName = childItemName;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public List<BomTreeResponse> getChildren() {
        return children;
    }

    public void setChildren(List<BomTreeResponse> children) {
        this.children = children;
    }
}