Sort and Filter use LINQ (Language-Integrated Query) 
Server bind via query string params about name of entity`s proprty and value which contains asc/desc for sort and value for property contains.
Algoritm recieve as example : 
	1. sort by Score in Descending (score%20desc). 
Sort use split as token and chek name of property by switch, next check the Order - asc/desc and add to the query OrderBy/OrderByDesc.
	2. filter Binding model(DTO) contains all properties names and check their value- it use Where(). Also has extra filter and sort Asc/Desc or choose result of current value or before/after it;
