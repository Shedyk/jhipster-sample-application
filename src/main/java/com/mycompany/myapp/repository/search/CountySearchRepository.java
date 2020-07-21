package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.County;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link County} entity.
 */
public interface CountySearchRepository extends ElasticsearchRepository<County, Long> {
}
