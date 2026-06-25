package backend.service;

import backend.dto.BomLinkDTO;
import backend.dto.BomTreeResponse;

import java.util.List;

public interface BomLinkService {

    BomLinkDTO createBomLink(BomLinkDTO bomLinkDTO);

    BomLinkDTO getBomLinkById(Long id);

    List<BomLinkDTO> getAllBomLinks();

    BomLinkDTO updateBomLink(Long id, BomLinkDTO bomLinkDTO);

    void deleteBomLink(Long id);

    // ✅ NEW: BOM Hierarchy API
    BomTreeResponse getBomTree(Long id);
    BomTreeResponse getBomTreeByItem(Long itemId);
}