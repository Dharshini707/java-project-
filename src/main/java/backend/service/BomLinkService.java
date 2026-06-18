package backend.service;

import backend.dto.BomLinkDTO;
import java.util.List;

public interface BomLinkService {

    BomLinkDTO createBomLink(BomLinkDTO bomLinkDTO);

    BomLinkDTO getBomLinkById(Long id);

    List<BomLinkDTO> getAllBomLinks();

    BomLinkDTO updateBomLink(Long id, BomLinkDTO bomLinkDTO);

    void deleteBomLink(Long id);
}