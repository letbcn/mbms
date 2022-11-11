<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.* " %>
<%@ page import="java.io.*" %>
<%@page import="org.jooq.*" %>
<%
try {
    String driver = "org.postgresql.Driver";
    String url = "jdbc:postgresql://localhost/mbms";
    String username = "postgres";
    String password = "postgres";
    String myDataField = null;
    String myQuery = "select json_agg(p) from (select distinct nombre_especie, case when nom_comu_cat is not null then nombre_especie || ' (' || nom_comu_cat ||')' else nombre_especie end as nom from samples_especie where nombre_especie is not null order by nom) p";
    Connection myConnection = null;
    PreparedStatement myPreparedStatement = null;
    ResultSet myResultSet = null;
    Class.forName(driver).newInstance();
    myConnection = DriverManager.getConnection(url,username,password);
    System.out.println("Opened database successfully");
    myPreparedStatement = myConnection.prepareStatement(myQuery);
    ResultSet rs = myPreparedStatement.executeQuery();
	while(rs.next()){
        String valor = String. valueOf(rs.getObject(1));
		out.print(valor);
        myConnection.close();
	}
 

}
catch(ClassNotFoundException e){
    e.printStackTrace();
}
catch (SQLException ex) {
}
%>
