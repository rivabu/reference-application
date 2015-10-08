<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8"/>
    
    <title>World - Country Maintenance</title>    
    
    <link rel="stylesheet" href="<c:url value=" /css/world.css"/>" type="text/css"/>
  </head>
  
  <body>
    <h1><a href="<c:url value=" /home"/>">World</a></h1>
    
    <section>
    
      <form:form modelAttribute="country" action="${pageContext.request.contextPath}/countries" method="POST">
      
        <c:choose>
          <c:when test="${country.newCountry}">
            <button type="submit" name="create">
              Create
            </button>
          </c:when>
          <c:otherwise>
            <button type="submit" name="update">
              Update
            </button>
          </c:otherwise>
        </c:choose>
    
        <table class="editor silver">
          <tr>
            <th colspan="2">Edit Country Details</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              <form:input path="name" size="30" maxlength="50"/><br/>
              <form:errors path="name" cssClass="error"/>
            </td>
          </tr>
          <tr>
            <td>Area (sq mi)</td>
            <td>
              <form:input path="area" size="8" maxlength="8"/><br/>
              <form:errors path="area" cssClass="error"/>
            </td>
          </tr>
          <tr>
            <td>Population</td>
            <td>
              <form:input path="population" size="10" maxlength="10"/><br/>
              <form:errors path="population" cssClass="error"/>
            </td>
          </tr>      
        </table>

      </form:form>
      
    </section>
    
    <a href="<c:url value='/countries' />">
      &laquo; cancel
    </a>
    
  </body>
</html>