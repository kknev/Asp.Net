##Sort and Filter## <br/>
**Sort** and **Filter** use **LINQ** (*Language-Integrated Query*).
Server receive query string params. Query contains name of entity`s proprty and it`s value.  <br/>
**Example** <br />
* **Sort** by Score in Descending (score%20desc).<br/>
Sort use split as token and chek name of property by switch, next check the Order - asc/desc and modify the query with *LINQ* **OrderBy**/**OrderByDesc**. <br/>
* **Filter** use Binding model. It contains all properties names and check their values. Filter use *LINQ* **Where()**. *Filter* can *Sort* **Asc**/**Desc** too. Also extra choose result of **Current** value or **Before**/**After** it.
