FAM::Machine::CPU.class_eval do
  def cpu_output out, ascii
    ascii == :PLAIN ? out.to_s : out.chr
  end

  def inject_input i
    @inject = i
  end

  def cpu_input
    @inject || -1
  end

  def step parsed
    @parsed = parsed
    return {:state => 'done'} if @tree_index >= parsed.tree.size || @halted
    @tree_index += 1
    node = parsed[@tree_index]
    if parsed[@tree_index].base_name == 'InNode' && !@rerun
      @tree_index -= 1
      @rerun = true
      return {:state => 'running', :input => true, :output => @outputting}
    end

    @rerun = false
    status = execute node
    if status == :STOP
      @halted = true
      return {:state => 'done'}
    end
    {:state => 'running', :input => false, :output => @outputting}
  end
end
