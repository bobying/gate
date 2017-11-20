package com.cloud.gate.repository.search;

import com.cloud.gate.domain.PFound;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PFound entity.
 */
public interface PFoundSearchRepository extends ElasticsearchRepository<PFound, Long> {
}
