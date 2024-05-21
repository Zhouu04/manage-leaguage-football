package com.manageleaguefootball.demo.helper;

import com.manageleaguefootball.demo.dto.Info.PageInfo;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Query;

public class QueryUtils {
  public static void getQuerySortAndPageable(Query query, PageInfo model) {

    // Lấy theo page
    if (model.getCurrentPage() > 0 && model.getRecordPerPage() > 0) {
      Pageable pageable = PageRequest.of(model.getCurrentPage() - 1, model.getRecordPerPage());
      query.with(pageable);
    }
  }
}
