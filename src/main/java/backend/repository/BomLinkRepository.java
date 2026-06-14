package backend.repository;

import backend.entity.BomLink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BomLinkRepository extends JpaRepository<BomLink, Long> {
}