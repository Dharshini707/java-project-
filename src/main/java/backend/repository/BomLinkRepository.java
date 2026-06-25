package backend.repository;

import backend.entity.BomLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BomLinkRepository extends JpaRepository<BomLink, Long> {

    List<BomLink> findByParentItem_Id(Long parentItemId);
}