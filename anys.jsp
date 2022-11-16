<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.* " %>
<%@ page import="java.io.*" %>

<%
try {
    String driver = "org.postgresql.Driver";
    /*String url = "jdbc:postgresql://localhost/mbms";
    String username = "postgres";
    String password = "postgres";*/
    String url = "jdbc:postgresql://95.216.35.146/mbms";
    String username = "mbms_ro";
    String password = "J<`7XAe+?u4oLLZge&s=e\"%;/(Fy<4>?";
    String myDataField = null;
    String myQuery = "select json_agg(p) from (select distinct EXTRACT(YEAR FROM fecha) as year from samples_muestreo order by year) p";
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
